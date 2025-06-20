kubectl create ns dev

kubectl create \
    -f dev.yml \
    --record --save-config
kubectl --namespace dev describe \
    quota dev
echo "CREATING RESOURCES"
kubectl --namespace dev create \
    -f go-demo-2.yml \
    --save-config --record

kubectl --namespace dev \
    rollout status \
    deployment go-demo-2-api
echo "GETTING QUOTA OF DEV NAMESPACE"
kubectl --namespace dev describe \
    quota dev
echo "BREAKING LIMIT QUOTA"
kubectl --namespace dev apply \
    -f go-demo-2-scaled.yml \
    --record
echo "GETTING EVENTS"
kubectl --namespace dev get events
echo "ANALYZING THE ERROR"
kubectl describe namespace dev
echo "GETTING PODS"
kubectl get pods --namespace dev
echo "REVERT RESOURCES"
kubectl --namespace dev apply \
    -f go-demo-2.yml \
    --record
kubectl --namespace dev \
    rollout status \
    deployment go-demo-2-api