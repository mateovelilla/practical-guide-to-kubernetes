kubectl create -f rb-dev.yml \
    --record --save-config
echo "Check if jdoe can create an delete deployments"
kubectl --namespace dev auth can-i \
    create deployments --as jdoe

kubectl --namespace dev auth can-i \
    delete deployments --as jdoe
echo "Creating the resources"
kubectl create -f rb-jdoe.yml \
    --record --save-config
echo "Verification"
kubectl --namespace jdoe auth can-i \
    "*" "*" --as jdoe