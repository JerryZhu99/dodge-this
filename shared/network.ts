
/**
 * Represents a networked object that is synced between client and server.
 */
export interface NetworkObject{
    /**
     * A unique id.
     */
    id: string;

    /**
     * Serializes the object to a form for transmission.
     */
    serialize(): any;
    
    /**
     * Restores the object state from the data.
     */
    deserialize(data: any): void;
}