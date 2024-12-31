package conf

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/namsral/flag"
)

var (
	WebsitePort  = ""
	Domain       = ""
	AppEnv       = "dev"
	LayoutMobile = false
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	flag.StringVar(&WebsitePort, "website-port", "5000", "Website Port default 5000")
	flag.StringVar(&Domain, "domain", "http://localhost:5000", "Domain website default http://localhost:5000")
	flag.StringVar(&AppEnv, "app-env", "dev", "app env default dev (prd,dev)")
	flag.BoolVar(&LayoutMobile, "laylout-mobile", false, "layout mobile (true,false)")
	
	flag.Parse()
}
