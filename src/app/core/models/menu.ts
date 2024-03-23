export interface MenuItem {
    text: string;
    action: (arg: any) => void;
}