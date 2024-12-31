package main

import (
	"gowebhtml/frontend/conf"
	"gowebhtml/frontend/routes"
	"html/template"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/template/html/v2"
)

func main() {
	engine := html.New("./views", ".html")
	engine.Reload(true)
	engine.AddFuncMap(funcMap())

	app := fiber.New(fiber.Config{
		Views: engine,
	})

	if conf.AppEnv == "dev" {
		app.Use(logger.New(logger.Config{
			Format: `{"ip":${ip}, "timestamp":"${time}", "status":${status}, "latency":"${latency}", "method":"${method}", "path":"${path}"}` + "\n",
		}))
	}

	comp := routes.NewComposerHandler()
	app.Get("/", comp.PagesHdl())
	app.Get("/:page", comp.PagesHdl())

	app.Static("/static", "./public")
	app.Listen(":" + conf.WebsitePort)
}

func funcMap() map[string]interface{} {
	return map[string]interface{}{
		"site": func() template.URL {
			if conf.Domain == "" {
				conf.Domain = "/"
			}

			return template.URL(conf.Domain)
		},
	}
}
