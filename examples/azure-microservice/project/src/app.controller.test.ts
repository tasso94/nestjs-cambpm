import * as app_controller from "./app.controller"
// @ponicode
describe("triggerAzureFunction", () => {
    let inst: any

    beforeEach(() => {
        inst = new app_controller.AppController()
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.triggerAzureFunction()
        }
    
        expect(callFunction).not.toThrow()
    })
})
