kubectl describe clusterrole admin

kubectl create \
    -f crb-release-manager.yml \
    --record --save-config

kubectl describe \
    clusterrole release-manager

kubectl --namespace default auth \
    can-i "*" pods --as jdoe

kubectl --namespace default auth \
    can-i create deployments --as jdoe

kubectl --namespace default auth can-i \
    delete deployments --as jdoe

kubectl config use-context jdoe

kubectl --namespace default \
     create deployment db \
     --image mongo:3.3

kubectl --namespace default \
    delete deployment db

kubectl config set-context jdoe \
    --cluster jdoe \
    --user jdoe \
    --namespace jdoe

kubectl config use-context jdoe

kubectl create deployment db --image mongo:3.3

kubectl delete deployment db

kubectl create rolebinding mgandhi \
    --clusterrole=view \
    --user=mgandhi \
    --namespace=jdoe
