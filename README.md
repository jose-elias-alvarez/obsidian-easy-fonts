# Easy Fonts

Easily load custom fonts, even on mobile.

## Why?

Obsidian itself makes it quite easy to load custom system fonts, but mobile platforms make it quite difficult to install system fonts in the first place, meaning it's hard to use a consistent font across platforms. Easy Fonts makes it easy!

## Usage

After installing the plugin as usual, follow the steps below:

1. Put your font(s) anywhere into your Obsidian vault
2. In the plugin's options, set the path for each font / variant you want to use
3. Hit the `Reload fonts` in the plugin's settings or use the `Easy Fonts: Reload fonts` command

For example: if I want to use `Iosevka.ttf` as my monospace font, I'll put it into `Fonts/Iosevka.ttf`, set that path under the relevant setting, and then reload. That's it!

## FAQ

### What font formats are supported?

Obsidian uses web technologies for rendering, so only the following formats are supported:

- `ttf`
- `otf`
- `woff`
- `woff2`

If your font is in a different format, you can try conversion tools like [Convertio](https://convertio.co/font-converter/), but your mileage may vary.

### My font supports bold / italic but I'm not seeing it!

If you have a single font file that contains multiple variants, make sure that file is specified as the bold / italic font in the plugin's settings. Due to how Obsidian's styling works, it can't pick up multiple variants from the same font.

### Will this affect my startup time?

The plugin does _a lot_ of work to ensure that loading fonts is as quick as possible, and loading only occurs on startup (or on demand). You can see how long it takes to load each font in the developer console, which you can open on desktop using Control + Shift + I / Command + Option + I.

If your font is especially large (>500kb), you can try removing unnecessary symbols using a tool like [pyftsubset](https://fonttools.readthedocs.io/en/latest/subset/index.html). [This simple Ruby wrapper](https://gist.github.com/jose-elias-alvarez/5d12312fd1cf20ac08c4900345a5ac22) demonstrates how to remove unnecessary Unicode symbol ranges.

Also, if you have the option, prefer `woff2` files, which have better compression.

### Will this slow down Obsidian?

Once fonts have been loaded, the plugin does not affect Obsidian's performance in any way.

### Will this take up space in my vault?

The plugin caches decoded font data, so each font in use will take roughly double the space (fonts not in use are not cached). If this is an issue, I recommend resizing large fonts using the instructions above.

### My font works on desktop but not on mobile (or vice versa)!

Make sure the path to your font(s) matches the **exact** path on disk, since some platforms have case-sensitive file systems.
