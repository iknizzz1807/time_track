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
let isMinimized: boolean = $state(false);

let interval: any;

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
    },
    stop() {
      isRunning = false;
      time = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      // Write to db
    },
    pause() {
      isRunning = false;
    },
    reset() {
      this.stop();
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
  };
}
