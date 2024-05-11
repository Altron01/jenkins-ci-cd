pipeline {
    agent none

    stages {
        stage('SonarQube Analysis') {
            agent {
                kubernetes {
                    inheritFrom 'sonarqube'
                }
            }
            steps {
                container('sonarqube') {

                    withSonarQubeEnv('<sonarqubeInstallation>') {
                        
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