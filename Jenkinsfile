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
                    sh '/opt/sonar-scanner/bin/sonar-scanner -Dsonar.token=squ_400d35a29a6f814a1c35b90bf0096d150ea37759'

                }
            }
        }
    }
}