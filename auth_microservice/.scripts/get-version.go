package main

import "fmt"
import "os"
import "encoding/json"
import "io/ioutil"
import "log"

func main() {
	jsonFile, err := os.Open("package.json")
	if err != nil {
    log.Fatal(err)
	} else {
		byteValue, _ := ioutil.ReadFile("package.json")
		defer jsonFile.Close()
		var data map[string]interface{}
		json.Unmarshal(byteValue, &data)
		fmt.Println(data["version"])
	}
}