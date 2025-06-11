import { spinner, log } from "@clack/prompts";
import * as p from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
export class CreateClusterWithVolumeHandler extends AbstractHandler {
    public async handle(request: Request){
        const clusterName = await p.text({
            message: 'What is the cluster name?',
            initialValue: 'myCluster'
        });
        request.clusterName = clusterName
        const { stdout: outputDeleteK3d, stderr: outputK3dDeleteError} = await this.runCommand("kubectl",["config", "get-clusters"]);
        const clustersFiltered= outputDeleteK3d
            .split('\n')
            .filter(cluster=> cluster==`k3d-${clusterName}`)
            
        const loader = spinner()
        if(clustersFiltered.length) {
            loader.start(`Using k3d-${clusterName} Cluster Server!`);
            const { stdout: outputUsingCluster, stderr: outputK3dUsingClusterError} = await this.runCommand("kubectl",["config", "use-context",`k3d-${clusterName}`]);
            log.info(outputUsingCluster);
            log.warn(outputK3dUsingClusterError)
            loader.stop("-----------------")
        }else {
            loader.start(`Creating k3d-${clusterName} Cluster Server!`);
            const volumes = request.volumes.map(volume => ['--volume', `${volume.localVolume}:${volume.remoteVolume}`]).flat()
            const args = ["cluster", "create",`${request.clusterName}`]
            const { stdout: outputK3d, stderr: outputK3dError} = await this.runCommand("k3d",args.concat(volumes));
            log.info(outputK3d);
            log.error(outputK3dError)
            loader.stop("Cluster Created!")
        }
        return await super.handle(request);
    }
}