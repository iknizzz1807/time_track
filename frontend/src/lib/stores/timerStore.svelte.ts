//This has live update for set and get data, used for timer
type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

let time: Time = $state({
  hours: 0,
  minutes: 0,
  seconds: 0,
});

let isRunning: boolean = $state(false);
let isPausing: boolean = $state(false);
let isMinimized: boolean = $state(false);

let interval: any;

let trackingActivity: string = $state("");

export function createTimer() {
  $effect(() => {
    if (isRunning) {
      clearInterval(interval);
      interval = setInterval(() => {
        time.seconds += 1;
        if (time.seconds >= 60) {
          time.seconds = 0;
          time.minutes += 1;
        }
        if (time.minutes >= 60) {
          time.minutes = 0;
          time.hours += 1;
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
  });
  return {
    start() {
      isRunning = true;
      isPausing = false;
    },
    stop() {
      isRunning = false;
      isPausing = false;
      trackingActivity = "";
      time = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      // Write to db
    },
    pause() {
      isRunning = false;
      isPausing = true;
    },
    reset() {
      isRunning = false;
      isPausing = false;
      time = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      // Do not need to write to db
    },
    checkIsMinimized() {
      return isMinimized;
    },
    minimize() {
      isMinimized = true;
    },
    maximize() {
      isMinimized = false;
    },
    get() {
      return time;
    },
    isRunning() {
      return isRunning;
    },
    getTrackingActivity() {
      return trackingActivity;
    },
    setTrackingActivity(activity: string) {
      trackingActivity = activity;
    },
    isPausing() {
      return isPausing;
    },
  };
}
