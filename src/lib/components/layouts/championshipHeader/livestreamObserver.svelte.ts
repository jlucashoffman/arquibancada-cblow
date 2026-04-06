class LivestreamController {
    inLive = $state(false);
    private loopId: number | undefined = undefined;
    private readonly retryWindowsMs = [5000, 60000, 1800000, 7200000];
    private readonly attemptsPerWindow = 10;
    private currentWindowIndex = 0;
    private attemptsInCurrentWindow = 0;

    private async checkYoda() {
        try {
            const response = await fetch('https://kick.com/api/v2/channels/yoda');
            const data = await response.json();

            this.inLive = data.livestream !== null || false;
        } catch {
            this.inLive = false;
        }

        return this.inLive;
    }

    private resetRetryWindow() {
        this.currentWindowIndex = 0;
        this.attemptsInCurrentWindow = 0;
    }

    private bumpRetryWindow() {
        this.attemptsInCurrentWindow += 1;

        if (this.attemptsInCurrentWindow < this.attemptsPerWindow) return;

        this.attemptsInCurrentWindow = 0;

        if (this.currentWindowIndex < this.retryWindowsMs.length - 1) {
            this.currentWindowIndex += 1;
        }
    }

    private nextDelayMs() {
        return this.retryWindowsMs[this.currentWindowIndex];
    }

    private scheduleNextTick(delay: number) {
        this.clearLoop();
        this.loopId = window.setTimeout(() => {
            this.loopObserver();
        }, delay);
    }

    async loopObserver() {
        const isLive = await this.checkYoda();

        if (isLive) {
            this.resetRetryWindow();
        } else {
            this.bumpRetryWindow();
        }

        this.scheduleNextTick(this.nextDelayMs());
    }

    clearLoop() {
        if(this.loopId !== undefined) {
            clearTimeout(this.loopId)
            this.loopId = undefined
        }
    }
}

export const livestreamObserver = new LivestreamController();