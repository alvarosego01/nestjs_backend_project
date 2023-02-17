import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SeedService } from "../services/seed.service";


@ApiTags('Seed')
@Controller('seed')
export class SeedController {
    constructor(private readonly seedService: SeedService) { }

    @Post()
    // @Auth(  )
    runSeed() {

        return this.seedService.runSeed();

    }


}
