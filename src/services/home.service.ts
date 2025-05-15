export default class HomeService {
    message: string = `Planti Planta Back HomePage`

    getHomeService() {
        return `${this.message}`
    }

    putHomeService() {
        return `SET ${this.message}`
    }

    postHomeService() {
        return ` POST ${this.message}`
    }

    deleteHomeService() {
        return `DELETE ${this.message}`
    }
}