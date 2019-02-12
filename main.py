import requests
import execjs
import time
from lxml import etree
import xml.etree.ElementTree as ET


headers = {
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
            'Referer':'http://u.baihe.com'
            }

class zzzfun(object):


    def request_js(self, url):
        resp = requests.get(url=url, headers=headers)
        html = etree.HTML(resp.text)
        result = etree.tostring(html)
        html = etree.HTML(result)
        tmp_js = html.xpath("//*[@id=\"bofang_box\"]/script[1]/text()")
        if tmp_js != []:
            fp = open("tmp.js", "w")
            decryption = open("decryption.js", "r").read()
            fp.write(tmp_js[0]+"\n"+decryption)
            fp.close()
            return True
        return False

    def decryption_js(self):
        player_js = open("tmp.js", "r")
        compile_js = execjs.compile(player_js.read())
        return compile_js.call("a")

    def request_page(self, home_url):
        self.episode = {}
        self.home_url = home_url
        resp = requests.get(url=home_url, headers=headers)
        html = etree.HTML(resp.text)
        result = etree.tostring(html)
        html = etree.HTML(result)
        for i in range(1, 100):
            section = html.xpath("/html/body/div[7]/div[2]/ul[1]/li[%d]/a/@href"%i)
            title = html.xpath("/html/body/div[7]/div[2]/ul[1]/li[%d]/a/span/text()"%i)
            if section == []:
                break
            else:
                self.episode[title[0]] = section[0]
        return self.episode

    def request_download_url(self, decryption_url):
        base_url = "http://www.zzzfun.com/static/danmu/ksyun.php?"
        resp = requests.get(url=base_url+decryption_url, headers=headers)
        html = etree.HTML(resp.text)
        result = etree.tostring(html)
        html = etree.HTML(result)
        download_url = html.xpath("//*[@id=\"video\"]/source/@src")
        return download_url

    def download_anime(self, download_url, download_title):
        content = requests.get(download_url, headers=headers)
        content = content.content
        fp = open(download_title+'.mp4', 'wb')
        fp.write(content)
        fp.close()


if __name__ == '__main__':
    test = zzzfun()
    test.request_page("http://www.zzzfun.com/vod-play-id-88-sid-1-nid-1.html")
    count = 0
    for i in test.episode:
        count += 1
        if count <5:
            continue
        test.request_js("http://www.zzzfun.com" + test.episode[i])
        decryption_url = test.decryption_js()
        print(decryption_url)
        download_url = test.request_download_url(decryption_url)
        print(download_url)

        if download_url != []:
            test.download_anime(download_url[0], "%s"%i)
        print("[+] Download %s done!"%count)

        time.sleep(10)




