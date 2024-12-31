package handlers

import (
	"fmt"
	"gowebhtml/frontend/conf"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/ua-parser/uap-go/uaparser"
)

type pageHdl struct{}

func NewPageHdl() *pageHdl {
	return &pageHdl{}
}

func isMobile(userAgent string) bool {
	parser := uaparser.NewFromSaved().Parse(userAgent)
	device := parser.Device.Family
	if device == "Mobile" || device == "Tablet" {
		return true
	}
	return false
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

		ua := c.Get("User-Agent")
		if isMobile(ua) && conf.LayoutMobile {
			if layout == "" {
				layoutPath = "mobile"
			} else {
				layoutPath += "_m"
			}
		}

		fmt.Printf("---->> Page   path: %s \n", pagePath)
		fmt.Printf("---->> Layout path: %s \n \n", layoutPath)

		return c.Render(pagePath, fiber.Map{
			"title": page,
		}, layoutPath)
	}
}
