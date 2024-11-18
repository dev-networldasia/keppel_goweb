package handlers

import (
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v2"
)

type pageHdl struct{}

func NewPageHdl() *pageHdl {
	return &pageHdl{}
}

func (h *pageHdl) PagesHdl() fiber.Handler {
	return func(c *fiber.Ctx) error {
		page := strings.TrimSpace(c.Params("page"))
		if page == "" || page == "/" || page == "index" {
			page = "home"
		}
		pagePath := page + "/index"

		layoutPath := "layouts/master"
		layout := strings.TrimSpace(c.Query("layout"))
		if layout != "none" && layout != "" {
			layoutPath = "layouts/" + layout
		}
		if layout == "none" {
			layoutPath = ""
		}

		fmt.Printf("---->> Page   path: %s \n", pagePath)
		fmt.Printf("---->> Layout path: %s \n \n", layoutPath)

		return c.Render(pagePath, fiber.Map{
			"title": page,
		}, layoutPath)
	}
}
