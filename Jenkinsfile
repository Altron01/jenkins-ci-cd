pipeline {
    
    agent {
        kubernetes {
            yaml '''
            spec:
              containers:
                - name: node
                  image: node:20.13.1-bullseye-slim
                  workingDir: "/home/jenkins/agent"
                  command:
                    - sleep
                  args:
                    - "99999999"
                  env:
                    - name: "JENKINS_AGENT_WORKDIR"
                      value: "/home/jenkins/agent"
                  volumeMounts:
                    - mountPath: "/home/jenkins/agent"
                      name: "workspace-volume"
                      readOnly: false
                - name: sonarqube
                  image: sonarsource/sonar-scanner-cli:5.0.1
                  workingDir: "/home/jenkins/agent"
                  command:
                    - sleep
                  args:
                    - "99999999"
                  env:
                    - name: "JENKINS_AGENT_WORKDIR"
                      value: "/home/jenkins/agent"
                  volumeMounts:
                    - mountPath: "/home/jenkins/agent"
                      name: "workspace-volume"
                      readOnly: false
            '''
        }
    }
    stages {
        stage('Build images') {
            agent {
                kubernetes {
                    yaml '''
                    spec:
                      containers:
                        - name: node
                          image: node:20.13.1-bullseye-slim
                          command:
                            - sleep
                          args:
                            - "99999999"
                          volumeMounts:
                            - mountPath: "/home/jenkins/agent"
                              name: "workspace-volume"
                              readOnly: false
                          workingDir: "/home/jenkins/agent"
                          env:
                            - name: "JENKINS_AGENT_WORKDIR"
                              value: "/home/jenkins/agent"
                        - name: docker
                          image: docker:dind
                          securityContext:
                            privileged: true
                          command:
                            - sleep
                          args:
                            - "99999999"
                          volumeMounts:
                            - mountPath: "/home/jenkins/agent"
                              name: "workspace-volume"
                              readOnly: false
                            - mountPath: /var/run/docker.sock
                              name: docker-socket-volume
                          workingDir: "/home/jenkins/agent"
                          env:
                            - name: "JENKINS_AGENT_WORKDIR"
                              value: "/home/jenkins/agent"
                      volumes:
                        - emptyDir:
                            medium: ""
                          name: "workspace-volume"
                        - name: docker-socket-volume
                          hostPath:
                            path: /var/run/docker.sock
                            type: File
                    '''
                }
            }
            steps {
                container('node') {
                    dir('auth_microservice') {
                        //def appVersion = "npm pkg get version"
                        //sh "echo $appVersion"
                        //sh "VERSION=${appVersion}-${BUILD_NUMBER}"
                        sh "VERSION=0.1.0-1234567"
                    }
                }
                container('docker') {
                    dir('auth_microservice') {
                        sh "docker build -t abc:0.1.0 ."
                    }
                }
            }
        }
    }
}