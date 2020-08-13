"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voice_pattern_controller_1 = require("./controller/voice-pattern.controller");
class ApiRouting {
    static ConfigureRouters(app) {
        app.use(voice_pattern_controller_1.VoicePatternController.route, new voice_pattern_controller_1.VoicePatternController().router);
    }
}
exports.ApiRouting = ApiRouting;
//# sourceMappingURL=api.routing.js.map