#!/bin/bash
k3d cluster create mycluster \
  --volume /usercode/certs:/etc/rancher/k3s/certs@server:0
openssl version
mdkir keys
openssl genrsa -out keys/jdoe.key 2048
openssl req -new \
    -key keys/jdoe.key \
    -out keys/jdoe.csr \
    -subj "/CN=jdoe/O=devs"
ls -1 /usercode/certs/client-ca.*
openssl x509 -req \
    -in keys/jdoe.csr \
    -CA /usercode/certs/client-ca.crt \
    -CAkey /usercode/certs/client-ca.key \
    -CAcreateserial \
    -out keys/jdoe.crt \
    -days 365
cp /usercode/certs/server-ca.crt /usercode/certs/keys
ls -1 keys
SERVER=$(kubectl config view \
    -o jsonpath='{.clusters[?(@.name=="k3d-mycluster")].cluster.server}')
echo $SERVER
echo "Configuring kubectl(create a new cluster called jdoe)"
kubectl config set-cluster jdoe \
    --certificate-authority \
    /usercode/certs/keys/server-ca.crt \
    --server $SERVER
echo "Setting the credentials"
kubectl config set-credentials jdoe \
    --client-certificate keys/jdoe.crt \
    --client-key keys/jdoe.key
echo "Creating a new context"
kubectl config set-context jdoe \
    --cluster jdoe \
    --user jdoe

kubectl config use-context jdoe
echo "Getting the context"
kubectl config view
echo "Getting pods (You'll gett error because you don't have permissions yet)"
kubectl get pods
