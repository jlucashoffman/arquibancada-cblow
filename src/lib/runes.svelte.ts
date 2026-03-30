class NavbarController {
    isOpen = $state(false);

    trigger = () => { this.isOpen = !this.isOpen; };
}

export const navManager = new NavbarController();