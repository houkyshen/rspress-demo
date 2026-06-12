# VS code常用插件
## Common
### Material Icon Theme
Material Icon Theme让图标变得非常好看。

### Path Intellisense
Path Intellisense是一个插件，它可以自动完成路径。只需要在单引号'或者双引号"后输入路径/或者./，就会出现路径提示。

## Markdown
### Markdown All in One
### Image Paste
按crtl+shift+p打开命令，搜索Open User Settings(JSON)，然后输入以下的配置：
```json
{
  "pasteImage.basePath": "${currentFileDir}",
  "pasteImage.path": "${currentFileDir}/images",
  "pasteImage.namePrefix": "${currentFileNameWithoutExt}-",
}
```
属性解析：
- basePath：图片的基路径，如果设置为${projectRoot}，则路径${currentFileDir}会很长（出现很多“../../”，如果设置为${currentFileDir}，则路径${currentFileDir}会短很多
- path：图片保存的路径
- namePrefix：图片名称的前缀

## Python
### Even Better TOML
Even Better TOML是一个插件，它可以实现对TOML文件的语法高亮。

## better comment
让注释变好看。
![](images/VS%20code常用插件-2026-06-12-08-44-32.png)
