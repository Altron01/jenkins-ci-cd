pipeline {
    environment {
      SONARQUBE_TOKEN         = credentials('sonarqube-token')
      HARBOR_USER_            = credentials('harbor-user-latest')
      HARBOR_PASSWORD         = credentials('harbor-password-latest')
      HARBOR_URL              = credentials('harbor-url')
      APP_NAME                = 'ms-auth'
    }
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
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
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
                            sh '/opt/sonar-scanner/bin/sonar-scanner -Dsonar.token=${env.SONARQUBE_TOKEN}'
                        }
                    }
                    
                }
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Checkout on master') {
            agent {
                label 'master'
            }
            steps {
                checkout scm
            }
        }
        stage('Build images') {
            agent {
                label 'master'
            }
            steps {
                dir('auth_microservice') {
                    sh 'VERSION=$(./.scripts/get-version)'
                    sh 'TIMESTAMP=$(date +%s)'
                    sh 'docker login -u ${env.HARBOR_USER} -p ${env.HARBOR_PASSWORD} ${env.HARBOR_URL}'
                    sh 'docker build -t auth:$VERSION-$TIMESTAMP .'
                }
            }
        }
    }
}

