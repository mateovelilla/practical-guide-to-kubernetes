#!/bin/bash
kubectl create -f crb-view.yml \
    --record --save-config
kubectl describe clusterrolebinding \
    view
echo "Validate if jdoe can view pods"
kubectl auth can-i get pods \
    --as jdoe --all-namespaces