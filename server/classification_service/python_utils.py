import pycrfsuite
import pprint
import sys
import re
import json
import nltk
import nyt_utils as utils
from string import punctuation
import numpy as np
from nltk.tokenize import PunktSentenceTokenizer 



data = sys.argv[1]
recipe_data = json.loads(data)

# for line in recipe_data:
#     print(line)

# print(recipe_data)

tagger = pycrfsuite.Tagger() #USED
tagger.open('./server/classification_service/trained_model')

tokenizer = PunktSentenceTokenizer() #Used

# with open('tmp/new_training_file.csv') as fname:
#     lines = fname.readlines()
#     items = [line.strip('\n').split('\t') for line in lines]
#     items = [item for item in items if len(item)==6]

sentences = []

# sent = [items[0]]
# for item in items[1:]:
#     if 'I1' in item:
#         sentences.append(sent)
#         sent = [item]
#     else:
#         sent.append(item)

# import random
# random.shuffle(sentences)
# test_size = 0.1
# data_size = len(sentences)

# test_data = sentences[:int(test_size*data_size)]
# train_data = sentences[int(test_size*data_size):]

# def sent2labels(sent):
#     return [word[-1] for word in sent]

# def sent2features(sent):
#     return [word[:-1] for word in sent]

def sent2tokens(sent):    #USED
    return [word[0] for word in sent]   #Good

def get_sentence_features(sent):   ##USED
    """Gets  the features of the sentence""" #good
    sent_tokens = utils.tokenize(utils.cleanUnicodeFractions(sent))  #good

    sent_features = [] #good
    for i, token in enumerate(sent_tokens): #good
        token_features = [token] #good
        token_features.extend(utils.getFeatures(token, i+1, sent_tokens)) #good
        sent_features.append(token_features) #good
    return sent_features #good

def format_ingredient_output(tagger_output, display=False): #USED
    """Formats the tagger output into a more convenient dictionary""" #Good
    data = [{}] #Good
    display = [[]]  #Good
    prevTag = None #Good


    for token, tag in tagger_output:
    # turn B-NAME/123 back into "name"
        tag = re.sub(r'^[BI]\-', "", tag).lower() #Good
        token = utils.unclump(token)

        # ---- DISPLAY ----
        # build a structure which groups each token by its tag, so we can
        # rebuild the original display name later.

        if prevTag != tag: #Good
            display[-1].append((tag, [token])) #Good
            prevTag = tag #Good
        else: 
            display[-1][-1][1].append(token) #Good
            #               ^- token
            #            ^---- tag
            #        ^-------- ingredient

            # ---- DATA ----
            # build a dict grouping tokens by their tag

            # initialize this attribute if this is the first token of its kind
        if tag not in data[-1]: #Good
            data[-1][tag] = [] #Good
 
        # HACK: If this token is a unit, singularize it so Scoop accepts it.
        if tag == "unit": #Good
            token = utils.singularize(token) #Good

        data[-1][tag].append(token) #Good

    # reassemble the output into a list of dicts.
    output = [ #Good
        dict([(k, utils.smartJoin(tokens)) for k, tokens in ingredient.items()]) #Good
        for ingredient in data #Good
        if len(ingredient) #Good
    ]

    # Add the raw ingredient phrase
    for i, v in enumerate(output): #Good
        output[i]["input"] = utils.smartJoin( #Good
            [" ".join(tokens) for k, tokens in display[i]]) #Good

    return output #Good

def parse_ingredient(sent): ##USED
    """ingredient parsing logic"""
    sentence_features = get_sentence_features(sent) #Good
    tags = tagger.tag(sentence_features) #import from crfsuite
    tagger_output = zip(sent2tokens(sentence_features), tags) #Good
    parsed_ingredient =  format_ingredient_output(tagger_output) #here
    if parsed_ingredient:
        parsed_ingredient[0]['name'] = parsed_ingredient[0].get('name','').strip('.') #Good
    return parsed_ingredient

def parse_recipe_ingredients(line): ##Good
    """Wrapper around parse_ingredient so we can call it on an ingredient list"""
    # print(ingredient_list) ##SO FAR SO GOOD ####
    # sentences = tokenizer.tokenize(ingredient_list) ##Good
    line.strip('\n')
    ingredients = []
    ingredients.extend(parse_ingredient(line)) #Good
    return ingredients



result = []

for line in recipe_data:
    result.append(parse_recipe_ingredients(line))




print(json.dumps(result))
