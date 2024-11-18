package routes

import (
	"gowebhtml/frontend/transport/handlers"

	"github.com/gofiber/fiber/v2"
)

type ComposerHandler interface {
	PagesHdl() fiber.Handler
}

func NewComposerHandler() ComposerHandler {
	return handlers.NewPageHdl()
}
