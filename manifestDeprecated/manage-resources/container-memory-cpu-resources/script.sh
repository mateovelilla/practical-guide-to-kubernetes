kubectl create \
    -f go-demo-2-random.yml \
    --save-config
kubectl rollout status \
    deployment go-demo-2-api
kubectl describe deploy go-demo-2-api
kubectl describe nodes