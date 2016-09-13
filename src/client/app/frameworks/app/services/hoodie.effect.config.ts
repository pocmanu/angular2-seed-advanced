export interface HoodieConfig {
    store: string;
    add:    {actionSource: string, actionDest: string};
    update: {actionSource: string, actionDest: string};
    delete: {actionSource: string, actionDest: string};
}
