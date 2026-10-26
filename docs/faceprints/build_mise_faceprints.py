import hashlib
import itertools
import json
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.fft import dctn

ROOT = Path('/workspace/scratch/f664f4416730')
OUT = ROOT / 'analysis' / 'mise_faceprints'
OUT.mkdir(parents=True, exist_ok=True)
MANIFEST = json.loads((ROOT/'analysis/reference_manifest.json').read_text())
CROP = [58,259,551,1266]

SCREENS = [
 {'id':'plan','source_image':1,'name':'Weekly meal plan','regions':[
  ['Greeting and retailer',[87,285,522,405],False],
  ['Estimated meal cost',[87,418,297,526],False],
  ['Grocery list progress',[311,418,521,526],False],
  ['Monday meal card',[87,541,522,692],False],
  ['Tuesday meal card',[87,703,522,854],False],
  ['Wednesday meal card',[87,871,522,1021],False],
  ['Thursday meal card',[87,1035,522,1184],True],
  ['Bottom navigation',[59,1175,550,1243],False]],
  'observed_controls':['Plan / meals / preferences / settings navigation; plan selected','Grocery-list progress card','Day-labeled meal cards'],
  'observed_data':['Personal greeting','Selected Aldi retailer','Estimated plan cost alongside budget and a progress bar','Grocery items bought count','Meal photo, name, category, cook time, servings and cost'],
  'rebuild_mapping':'Keep the plan, meal-card metadata, budget context and grocery progress. PantryShop Today\'s Specials replaces the opening presentation, while the weekly plan remains available.'},
 {'id':'recipe','source_image':2,'name':'Recipe detail','regions':[
  ['Dish photograph',[83,318,526,703],False],
  ['Back button',[91,327,143,378],False],
  ['Favorite button',[465,327,516,377],False],
  ['Recipe title',[92,727,522,757],False],
  ['Nutrition per serving',[83,774,526,921],False],
  ['Recipe notes',[83,937,526,1105],False],
  ['Mark as cooked',[104,1055,310,1085],False],
  ['Five-star rating control',[344,1053,504,1086],False],
  ['Ingredients / instructions tabs',[145,1135,466,1185],False],
  ['Copy recipe button',[82,1201,526,1253],False]],
  'observed_controls':['Back','Heart/favorite','Mark as cooked','Five outline stars','Ingredients / Instructions segmented control; Ingredients selected','Copy recipe'],
  'observed_data':['Large dish photograph','Recipe title','Calories, protein, carbs and fats per serving','Cook-time range','Servings'],
  'not_visible':['Actual ingredient rows','Actual cooking instructions','Post-click favorite/cooked/rating states'],
  'rebuild_mapping':'Preserve photo/title, recipe metadata, ingredients/instructions, favorites, cooked state and copy action. Add inventory coverage, additional spend and household-specific adaptations.'},
 {'id':'cuisines','source_image':3,'name':'Cuisine browsing','regions':[
  ['Italian tile',[89,278,304,554],False],
  ['Asian tile',[320,278,536,554],False],
  ['Mexican tile',[89,570,304,845],False],
  ['Indian tile',[320,570,536,845],False],
  ['Mediterranean tile',[89,862,304,1138],False],
  ['American tile',[320,862,536,1138],False],
  ['Bottom navigation',[59,1157,550,1243],False]],
  'observed_controls':['Six photographed cuisine tiles','Plan / meals / preferences / settings navigation; meals selected'],
  'observed_data':['Italian: pasta, risotto, gnocchi','Asian: noodles, curry, stir-fry','Mexican: tacos, burritos, fajitas','Indian: curry, tikka, tandoori','Mediterranean: gyros, halloumi, falafel','American: burgers, BBQ, mac & cheese'],
  'rebuild_mapping':'Preserve cuisine browsing as a recipe-discovery surface. Use cuisine filters or sections on the restaurant-style menu without claiming that a missing cuisine result is a matching pantry recipe.'},
 {'id':'preferences','source_image':4,'name':'Planning preferences','regions':[
  ['Preferences heading',[89,286,536,349],False],
  ['Country and currency',[89,386,536,484],False],
  ['Supermarket',[89,522,536,620],False],
  ['Household size',[89,663,536,829],False],
  ['Cooking days',[89,852,536,976],False],
  ['Weekly budget',[89,1009,536,1152],False],
  ['Bottom navigation',[58,1158,550,1243],False]],
  'observed_controls':['Country dropdown','Supermarket dropdown','Household decrement and increment','Seven day chips; Monday through Friday visually selected','Weekly budget slider','Plan / meals / preferences / settings navigation; preferences selected'],
  'observed_data':['United States and USD','Aldi','Household size one','Weekly budget $50 for five days; slider endpoint $95'],
  'not_visible':['Dropdown option sets','Dietary preferences or allergy controls','Other settings below or outside this published view'],
  'rebuild_mapping':'Preserve retailer, household size, cooking days and budget. Extend household preferences to person-level dietary restrictions and portions. Do not infer dropdown options from this screenshot.'},
 {'id':'groceries','source_image':5,'name':'Grocery checklist','regions':[
  ['Back and grocery-list heading',[82,281,527,339],False],
  ['Retailer and list progress',[201,353,407,419],False],
  ['Copy list button',[82,438,299,490],False],
  ['Share button',[310,438,527,490],False],
  ['Add groceries button',[82,514,527,574],False],
  ['Fruit and veg section heading',[89,601,250,622],False],
  ['Ingredient checklist',[82,631,528,1254],False]],
  'observed_controls':['Back','Copy list','Share','Add groceries','One circular checkbox per displayed ingredient'],
  'observed_data':['Aldi and 0/41 done','Fruit & veg category','Ingredient name, emoji, required amount note and purchase quantity','Cherry tomatoes, garlic, ginger, lemons, lettuce, red onion, red pepper and broccolini'],
  'not_visible':['Other grocery categories','Completion behavior','Share targets or export formats'],
  'rebuild_mapping':'Preserve grouped grocery checklist, custom additions, copying, sharing and completion. Compute pantry-covered quantities and remaining gaps, and bind list revisions to the locked meal plan.'}
]

def phash(image):
    pixels=np.asarray(image.convert('L').resize((64,64),Image.Resampling.LANCZOS),dtype=float)
    block=dctn(pixels,type=2,norm='ortho')[:16,:16].flatten()
    bits=block>np.median(block[1:]); bits[0]=False
    return f'{int("".join("1" if x else "0" for x in bits),2):064x}'

screens=[]
sheet=Image.new('RGB',(2100,1260),'#f5f3ee')
draw=ImageDraw.Draw(sheet)
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
heading=ImageFont.truetype(bold,31)
body=ImageFont.truetype(font,18)
small=ImageFont.truetype(font,15)
num=ImageFont.truetype(bold,15)
draw.text((28,22),'mise — all five published mobile reference views',font=heading,fill='#1b3023')
draw.text((28,68),'Manual faceprints of visible regions. Published artwork establishes appearance; controls were not exercised.',font=body,fill='#4d594e')
colors=['#216d52','#9c613e','#6861a0','#386c98','#8c4d68']

for col,spec in enumerate(SCREENS):
    item=next(m for m in MANIFEST if m['app']=='mise' and m['index']==spec['source_image'])
    source=Image.open(item['path']).convert('RGB')
    crop=source.crop(CROP)
    width,height=crop.size
    regions=[]
    for name,b,partial in spec['regions']:
        local=[b[0]-CROP[0],b[1]-CROP[1],b[2]-CROP[0],b[3]-CROP[1]]
        assert 0<=local[0]<local[2]<=width and 0<=local[1]<local[3]<=height
        normalized=[local[0]/width,local[1]/height,local[2]/width,local[3]/height]
        regions.append({'name':name,'source_bbox_px':b,'bbox_px':local,'bbox_normalized':normalized,'center_normalized':[(normalized[0]+normalized[2])/2,(normalized[1]+normalized[3])/2],'partially_visible_or_obscured':partial})
    vector=[width/height]+list(itertools.chain.from_iterable(r['bbox_normalized'] for r in regions))
    vector.extend(math.dist(a['center_normalized'],b['center_normalized']) for a,b in itertools.combinations(regions,2))
    record={k:v for k,v in spec.items() if k!='regions'}
    record.update({'source_url':item['source_url'],'source_image_path':item['path'],'source_dimensions_px':list(source.size),'crop_bbox_px':CROP,'crop_dimensions_px':[width,height],'regions':regions,'geometry_vector':vector,'geometry_vector_length':len(vector),'geometry_digest_sha256':hashlib.sha256(json.dumps(vector,separators=(',',':')).encode()).hexdigest(),'perceptual_hash_256bit_hex':phash(crop),'evidence_class':'VISUAL_APPEARANCE_AND_VISIBLE_CONTROL_ONLY','behavior_exercised':False})
    screens.append(record)
    x=28+col*414
    draw.text((x,111),spec['name'],font=ImageFont.truetype(bold,20),fill='#1b3023')
    display_height=720
    scale=display_height/height
    display=crop.resize((round(width*scale),display_height),Image.Resampling.LANCZOS)
    dx=x+15; dy=150
    sheet.paste(display,(dx,dy))
    for i,r in enumerate(regions,1):
        b=r['bbox_px']; box=[round(dx+b[0]*scale),round(dy+b[1]*scale),round(dx+b[2]*scale),round(dy+b[3]*scale)]
        draw.rectangle(box,outline=colors[col],width=2)
        draw.rectangle([box[0],box[1],box[0]+24,box[1]+21],fill=colors[col])
        draw.text((box[0]+4,box[1]+1),str(i),font=num,fill='white')
    draw.text((x,889),f'{len(regions)} regions / {len(vector)} geometry values',font=small,fill='#4d594e')
    for i,r in enumerate(regions,1):
        label=f'{i}. {r["name"]}'+(' *' if r['partially_visible_or_obscured'] else '')
        draw.text((x,924+(i-1)*25),label,font=small,fill='#1b3023')

draw.text((28,1200),'* Partly obscured by navigation. A crop may include rounded screen corners. Exact font family and off-screen pages are not established.',font=small,fill='#4d594e')
draw.text((28,1226),'Source: TEGS LABS LTD, App Store ID 6777471316, published iPhone images captured October 26, 2026. Artwork may lag the installed app.',font=small,fill='#4d594e')
sheet_path=OUT/'mise-annotated-contact-sheet.png'
sheet.save(sheet_path)

matte=np.asarray(Image.open(ROOT/'analysis/references/mise-01.jpg').convert('RGB'))[20:150,20:150]
median=np.median(matte.reshape(-1,3),axis=0).astype(int)
document={
 'app':{'name':'mise - meal planner','developer':'TEGS LABS LTD','app_store_id':'6777471316','app_store_url':'https://apps.apple.com/us/app/mise-meal-planner/id6777471316','metadata_version_in_prior_capture':'1.1.23'},
 'as_of':'2026-10-26',
 'scope':'The five visible mobile UI areas in public App Store artwork; not a complete app audit or a test of installed behavior.',
 'method':{'region_selection':'Manual semantic bounds, excluding outer promotional headline/matte','geometry_vector':'aspect ratio + four normalized bounds per region + all pairwise normalized center distances','visual_hash':'64x64 grayscale; orthonormal DCT-II; top-left 16x16 coefficients; median AC threshold; DC bit zero; row-major 64-character hexadecimal','comparison_rule':'Compare only the same screen and aligned semantic region order; no universal similarity threshold is calibrated.'},
 'shared_visual_patterns':{'content_frame_bbox_px':CROP,'content_frame_dimensions_px':[493,1007],'content_frame_aspect_ratio':493/1007,'approximate_regular_content_horizontal_inset_fraction':29/493,'approximate_regular_content_width_fraction':435/493,'matte_median_rgb_sample':median.tolist(),'matte_sample_note':'Median JPEG pixel color from outer top-left matte, not a verified brand color','structure':['Rounded white mobile content frame on green promotional matte','Dark sans-serif text; exact font not verified','Lime/green selected controls','Rounded photographic meal and cuisine cards','Four-item bottom navigation on plan, cuisine and preferences views','Recipe and grocery detail views use a back action instead of the bottom navigation']},
 'screens':screens,
 'not_established':['Complete navigation graph','Settings screen content','Onboarding and subscription screens','Pantry input or photo-recognition interface','Full recipe ingredient and instruction displays','Live data behavior, app errors, persistence, quantities and pricing accuracy','Feature parity with the current installed app'],
 'rebuild_direction':'Retain the documented mise surfaces and visible controls. Apply the user-approved PantryShop model: photos create reviewed inventory; Today\'s Specials is a restaurant-style opening menu; dishes expose inventory coverage and estimated additional grocery spend. Add per-person dietary planning and a locked meal-plan/shopping-list pair.'
}
json_path=OUT/'mise-screen-map.json'
json_path.write_text(json.dumps(document,indent=2))
assert len(screens)==5
assert all(len(s['perceptual_hash_256bit_hex'])==64 for s in screens)
print(json.dumps({'json':str(json_path),'contact_sheet':str(sheet_path),'screens':len(screens),'regions':sum(len(s['regions']) for s in screens),'geometry_lengths':{s['id']:s['geometry_vector_length'] for s in screens}}))
