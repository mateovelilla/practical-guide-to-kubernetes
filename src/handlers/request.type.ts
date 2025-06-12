export type Volume = {
    localVolume: String;
    remoteVolume: String;
}
export type Request = {
    clusterName?: String;
    localPort?: Number;
    exposedPort?: Number;
    serviceName?: String;
    namespace?: string;
    volumes?: Volume[];
};