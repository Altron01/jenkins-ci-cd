pipeline {
    
    agent {
        kubernetes {
            yaml '''
            spec:
              containers:
                - name: node
                  image: node:20.13.1-bullseye-slim
                - name: sonarqube
                  image: sonarsource/sonar-scanner-cli:5.0.1
                tty: false
                volumeMounts:
                  - mountPath: "/home/jenkins/agent"
                  name: "workspace-volume"
                  readOnly: false
                workingDir: "/home/jenkins/agent"
                args:
                  - "9999999"
                command:
                  - "sleep"
              - env:
                - name: "JENKINS_SECRET"
                  value: "********"
                - name: "JENKINS_TUNNEL"
                  value: "10.6.0.87:8081"
                - name: "JENKINS_AGENT_NAME"
                  value: "test-pipeline-30-42qsm-x7zcp-d45dn"
                - name: "JENKINS_NAME"
                  value: "test-pipeline-30-42qsm-x7zcp-d45dn"
                - name: "JENKINS_AGENT_WORKDIR"
                  value: "/home/jenkins/agent"
                - name: "JENKINS_URL"
                  value: "http://10.6.0.87:8080/"
            '''
        }
    }

    stages {
        stage('Run Unit Test') {
            steps {
                container('node') {
                    sh 'cd auth_microservice'
                    sh 'npm run test:unit'
                    
                }
            }
        }
        stage('SonarQube Analysis') {
            agent {
                kubernetes {
                    inheritFrom 'sonarqube'
                }
            }
            steps {
                container('sonarqube') {
                    withSonarQubeEnv(installationName: 'SonarQube') { // If you have configured more than one global server connection, you can specify its name as configured in Jenkins
                        sh '/opt/sonar-scanner/bin/sonar-scanner -Dsonar.token=squ_400d35a29a6f814a1c35b90bf0096d150ea37759'
                    }
                    
                }
                timeout(time: 1, unit: 'HOURS') {
                    // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
                    // true = set pipeline to UNSTABLE, false = don't
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}