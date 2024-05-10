pipeline {
    agent none

    stages {
        stage('SonarQube Analysis') {
            agent {
                kubernetes {
                    label 'sonarqube'
                }
            }
            container('sonarqube') {
                stage('Start Analysis') {
                    /opt/sonar-scanner/bin/sonar-scanner '-e SONAR_TOKEN="squ_400d35a29a6f814a1c35b90bf0096d150ea37759"'
                }
            }
        }
    }
}