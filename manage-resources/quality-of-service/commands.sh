k3d cluster create mycluster 

kubectl create \
    -f go-demo-2-random.yml \
    --record

kubectl rollout status \
    deployment go-demo-2-db

kubectl rollout status \
    deployment go-demo-2-api

#kubectl apply -f go-demo-2-insuf-node.yml --record
kubectl apply \
    -f go-demo-2.yml \
    --record

kubectl rollout status \
    deployment go-demo-2-api