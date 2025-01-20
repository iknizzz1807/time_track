package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/adrg/xdg"
	_ "github.com/mattn/go-sqlite3"
)

// App struct
type App struct {
	ctx context.Context
	db  *sql.DB
}

func CreateDir(dir string) error {
	err := os.MkdirAll(dir, os.ModePerm)
	if err != nil {
		return err
	}
	return nil
}

func InitSqliteDB(dirName string, dbName string) (*sql.DB, error) {
	dir := xdg.DataHome + "/" + dirName
	err := CreateDir(dir)
	if err != nil {
		log.Println("Creating Directory", "err", err.Error())
		return nil, err
	}
	db, err := sql.Open("sqlite3", dir+"/"+dbName)
	if err != nil {
		log.Println("Opening SqliteDB", "err", err.Error())
		return nil, err
	}
	log.Println("SqliteDB Opened", "dir", dir, "db", dbName)
	return db, nil
} // This creates a folder in the xdg.DataHome, on windows this means localappdata

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	db, err := InitSqliteDB("time-track-app", "database.db")
	if err != nil {
		log.Println(err.Error())
		return
	}
	a.db = db

	_, err = a.db.Exec("CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY, name TEXT, totalTime INTEGER)")
	if err != nil {
		log.Fatal(err)
	}

	// Check if the table is empty
	var count int
	err = a.db.QueryRow("SELECT COUNT(*) FROM activities").Scan(&count)
	if err != nil {
		log.Fatal(err)
	}

	// If the table is empty, insert default activities
	if count == 0 {
		_, err = a.db.Exec("INSERT INTO activities (name, totalTime) VALUES ('Coding', 0), ('Reading', 0), ('Exercise', 0)")
		if err != nil {
			log.Fatal(err)
		}
	}
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

type Activity struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	TotalTime int    `json:"total_time"`
}

func (a *App) GetActivities() ([]Activity, error) {
	rows, err := a.db.Query("SELECT id, name, totalTime FROM activities")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	activities := make([]Activity, 0)

	for rows.Next() {
		var activityItem Activity
		err := rows.Scan(&activityItem.Id, &activityItem.Name, &activityItem.TotalTime)
		if err != nil {
			return nil, err
		}
		activities = append(activities, activityItem)

	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return activities, nil
}

func (a *App) CreateActivity(activity Activity) error {
	// Check if an activity with the same name already exists
	var count int
	err := a.db.QueryRow("SELECT COUNT(*) FROM activities WHERE name = ?", activity.Name).Scan(&count)
	if err != nil {
		return err
	}

	if count > 0 {
		return fmt.Errorf("an activity with the name '%s' already exists", activity.Name)
	}

	// Insert the new activity
	_, err = a.db.Exec("INSERT INTO activities (name, totalTime) VALUES (?, ?)", activity.Name, 0)
	if err != nil {
		return err
	}
	return nil
}

func (a *App) DeleteActivity(name string) error {
	_, err := a.db.Exec("DELETE FROM activities WHERE name = ?", name)
	if err != nil {
		return err
	}
	return nil
}
