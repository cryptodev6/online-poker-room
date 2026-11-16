from PIL import Image,ImageOps,ImageDraw,ImageEnhance,ImageFilter
from pathlib import Path
srcs={
'film':Image.open('/mnt/data/a_cinematic_high_detail_website_landing_page_sect.png').convert('RGB'),
'inv':Image.open('/mnt/data/a_cinematic_high_detail_dark_warm_toned_webpage.png').convert('RGB'),
'board':Image.open('/mnt/data/a_cinematic_high_detail_web_ux_cinematic_storyboa.png').convert('RGB'),
'board2':Image.open('/mnt/data/a_cinematic_high_detail_cinematic_storyboard_styl.png').convert('RGB'),
}
# Bounds left top right bottom
recipes=[
('invitation','inv',(630,48,1515,742)),
('arrival','film',(795,180,1590,790)),
('observing','inv',(794,30,1535,695)),
('departure','board2',(185,257,530,448)),
('straddle','board2',(725,266,1089,450)),
('tired','board2',(1210,253,1655,453)),
('preflop','board2',(270,475,522,660)),
('flopturn','board2',(786,478,1030,654)),
('river','board2',(1445,493,1655,660)),
('showdown','board2',(258,696,466,930)),
('recall','board',(640,679,925,914)),
('reprise','board',(1150,684,1620,820)),
]
thumb=Image.new('RGB',(320*4,250*3),(10,10,10)); d=ImageDraw.Draw(thumb)
for i,(name,key,rect) in enumerate(recipes):
 im=srcs[key].crop(rect)
 x=(i%4)*320;y=(i//4)*250
 thumb.paste(ImageOps.fit(im,(320,220)),(x,y));d.text((x+10,y+224),name,fill='white')
thumb.save('/mnt/data/voss-candidate-crops.jpg',quality=92)
