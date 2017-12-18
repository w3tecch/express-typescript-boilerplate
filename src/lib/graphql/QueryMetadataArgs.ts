export interface QueryMetadataArgs {
    name: string;
    /**
     * Indicates object which is used by this controller.
     */
    target: () => void;
}
