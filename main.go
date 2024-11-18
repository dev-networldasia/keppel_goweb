package main

import (
	"gowebhtml/frontend/routes"
	"html/template"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/template/html/v2"
	"github.com/joho/godotenv"
	"github.com/namsral/flag"
)

var (
	websitePort = ""
	domain      = ""
	appEnv      = "dev"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	flag.StringVar(&websitePort, "website-port", "5000", "Website Port default 5000")
	flag.StringVar(&domain, "domain", "http://localhost:5000", "Domain website default http://localhost:5000")
	flag.StringVar(&appEnv, "app-env", "dev", "app env default dev (prd,dev)")
	flag.Parse()
}

func main() {
	engine := html.New("./views", ".html")
	engine.Reload(true)
	engine.AddFuncMap(funcMap())

	app := fiber.New(fiber.Config{
		Views: engine,
	})

	if appEnv == "dev" {
		app.Use(logger.New(logger.Config{
			Format: `{"ip":${ip}, "timestamp":"${time}", "status":${status}, "latency":"${latency}", "method":"${method}", "path":"${path}"}` + "\n",
		}))
	}

	comp := routes.NewComposerHandler()
	app.Get("/", comp.PagesHdl())
	app.Get("/:page", comp.PagesHdl())

	app.Static("/static", "./public")
	app.Listen(":" + websitePort)
}

func funcMap() map[string]interface{} {
	return map[string]interface{}{
		"site": func() template.URL {
			if domain == "" {
				domain = "/"
			}

			return template.URL(domain)
		},
	}
}
