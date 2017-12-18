export interface MutationMetadataArgs {
    name: string;
    /**
     * Indicates object which is used by this controller.
     */
    target: () => void;
}
