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
        stage('Run Unit Test') {
            steps {
                container('node') {
                    dir('auth_microservice') {
                        sh 'npm install --dev'
                        sh 'npm run test'
                        sh 'cp coverage/unit/lcov.info coverage/unit-lcov.info'
                        sh 'cp coverage/integration/lcov.info coverage/integration-lcov.info'
                    }
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                container('sonarqube') {
                    withSonarQubeEnv(installationName: 'SonarQube') { // If you have configured more than one global server connection, you can specify its name as configured in Jenkins
                        dir('auth_microservice') {
                            sh '/opt/sonar-scanner/bin/sonar-scanner -Dsonar.token=squ_400d35a29a6f814a1c35b90bf0096d150ea37759'
                        }
                    }
                    
                }
                timeout(time: 1, unit: 'HOURS') {
                    // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
                    // true = set pipeline to UNSTABLE, false = don't
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Build images') {
            agent {
                label 'master'
            }
            steps {
                dir('auth_microservice') {
                    sh 'su jenkins'
                    sh "docker build -t abc:0.1.0 ."
                }
            }
        }
    }
}
