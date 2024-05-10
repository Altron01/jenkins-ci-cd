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
                ls
            }
        }
        //stage('SonarQube Analysis') {
        //    agent {
        //        kubernetes {
        //            label 'sonarqube'
        //        }
        //    }
        //    steps {
        //        
        //        sonar-scanner
        //        }
        //    }
        //}
    }
}

//Set vars
//Sonarqube
//Build App
//Test docker
//Upload
//