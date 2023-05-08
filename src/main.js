import { Telegraf, session } from 'telegraf'
import { initCommand, processTextToChat, INITIAL_SESSION } from './logic.js'

const bot = new Telegraf('TG_TOKEN')

bot.launch()

bot.use(session()) 

bot.command('new', initCommand)
bot.command('start', initCommand)

bot.on('message', async (ctx) => {
    ctx.session ??= INITIAL_SESSION
    try {
      await processTextToChat(ctx, ctx.message.text)
    } catch (e) {
      console.log(`Error while message`, e.message)
    }
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
