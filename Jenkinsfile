pipeline {
    agent none

    stages {
        stage('SonarQube Analysis') {
            agent {
                kubernetes {
                    label 'sonarqube'
                }
            }
            steps {
                ls ./
            }
        }
    }
}