def repo = scm.getUserRemoteConfigs()[0].getUrl().tokenize('/')[3].split("\\.")[0]
def registry = 'registry.dappd.net'
def namespace = 'dappd_games'
def host_url = ''


// Do not change anything below if you don't know what you are doing!!!
def buildNumber = env.BUILD_NUMBER as int
if (buildNumber > 1) milestone(buildNumber - 1)
milestone(buildNumber)

pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
metadata:
    labels:
        jenkins: worker
    annotations:
        container.apparmor.security.beta.kubernetes.io/image-builder: unconfined
spec:
    imagePullSecrets:
    - name: image-pull-secret
    containers:
    - name: image-builder
      image: moby/buildkit:master-rootless
      env:
        - name: BUILDKITD_FLAGS
          value: --oci-worker-no-process-sandbox
        - name: DOCKER_CONFIG
          value: /workspace
      securityContext:
        seccompProfile:
          type: Unconfined
        runAsUser: 1000
        runAsGroup: 1000
      command: [\"cat\"]
      tty: true
      volumeMounts:
      - name: dockerconfig
        mountPath: /workspace/config.json
        readOnly: true
        subPath: .dockerconfigjson
      - name: buildkitd
        mountPath: /home/user/.local/share/buildkit
    - name: ubuntu
      image: ubuntu:latest
      command: [\"cat\"]
      tty: true
      volumeMounts:
      - name: kubeconfig
        mountPath: /root/.kube/config
        readOnly: true
        subPath: kubeconfig
      - name: dockerconfig
        mountPath: /root/config.json

    volumes:
    - name: dockerconfig
      secret:
        secretName: image-pull-secret
    - name: kubeconfig
      secret:
        secretName: kubeconfig
    - name: buildkitd
      emptyDir: {}
"""
        }
    }

    environment {
        repo = "${repo}".toLowerCase()
        branch = "${GIT_BRANCH}".toLowerCase()
        commit_hash = "${GIT_COMMIT}"
        image_registry = "${registry}"
        image_repo = "${registry}/${repo}"
        image_tag = "${branch}-${commit_hash}"
        host_url = "${host_url}"
        namespace = "${namespace}"
    }

    stages {
        stage('Build and push image to registry') {
            steps {
                container('image-builder') {
                    sh 'buildctl-daemonless.sh build --frontend dockerfile.v0 --local context=$(pwd) --local dockerfile=$(pwd) --output type=image,name=${image_repo}:${image_tag},push=true --export-cache type=registry,ref=${image_repo}:buildcache --import-cache type=registry,ref=${image_repo}:buildcache'
                }
            }
        }

        stage('Deploy helm chart') {
            steps {
                container('ubuntu') {
                    sh 'apt update && apt install curl -y'
                    sh 'curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.26.0/bin/linux/amd64/kubectl && chmod +x kubectl && mv kubectl /usr/local/bin/kubectl'
                    sh 'curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 && chmod +x get_helm.sh && ./get_helm.sh'
                    sh '(kubectl create namespace ${namespace:-repo} && echo "namespace does not exist, provisioning namespace..." && kubectl get secrets/image-pull-secret --namespace=jenkins -o yaml | sed \'s/namespace: .*//\' | kubectl -n ${namespace:-repo} apply -f -) || echo "namespace exists, moving on..."'

                    sh '''
default_host_url="${repo}-${branch}.projectsv2.dappd.net"
[ "$branch" != "prod" ] && host_url=$default_host_url
host_url=${host_url:-$default_host_url}
cat <<EOT >> helm_values.yaml
image:
    repository: "${image_repo}"
    tag: "${image_tag}"
nameOverride: "${repo}-${branch}"
fullnameOverride: "${repo}-${branch}"
ingress:
    hosts:
    - host: ${host_url}
      paths:
      - path: /
        pathType: Prefix
    tls:
    - secretName: ${repo}-${branch}-cert
      hosts:
      - ${host_url}
EOT
                    '''
                    sh 'cat helm_values.yaml'
                    sh 'helm -n ${namespace:-repo} upgrade --install ${repo}-${branch} chart --values helm_values.yaml'
                }
            }
        }
    }
}
