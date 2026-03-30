class NavbarController {
    isOpen = $state(false);

    trigger = () => { this.isOpen = !this.isOpen; };
}

class LivestreamController {
    inLive = $state(false);
    private loopId: number | undefined = undefined;

    async checkYoda() {
        const response = await fetch('https://kick.com/api/v2/channels/yoda');
        const data = await response.json();

        this.inLive = data.livestream !== null || false;
    }

    loopObserver() {
        this.loopId = setInterval(() => {
            this.checkYoda();
        }, 5000)
    }

    clearLoop() {
        if(this.loopId) {
            clearInterval(this.loopId)
            this.loopId = undefined
        }
    }
}

export const navManager = new NavbarController();
export const livestreamObserver = new LivestreamController();