openssl req -in /usercode/certs/keys/jdoe.csr \
    -noout -subject

kubectl config use-context k3d-mycluster

kubectl apply -f groups.yml \
    --record

kubectl --namespace dev auth \
    can-i create deployments --as jdoe

kubectl config use-context jdoe

kubectl --namespace dev \
     create deployment new-db \
     --image mongo:3.3

k3d cluster delete mycluster --all 