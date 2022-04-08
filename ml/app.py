from flask import Flask, request  # 서버 구현을 위한 Flask 객체 import
from flask_restx import Api, Resource  # Api 구현을 위한 Api 객체 import
import pandas as pd
import datetime as dt
import numpy as np
import pickle
import joblib

app = Flask(__name__)  # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
api = Api(app)  # Flask 객체에 Api 객체 등록


@api.route('/api/predict')  # 데코레이터 이용, '/hello' 경로에 클래스 등록
class Predict(Resource):
    def post(self):  # GET 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
        
        lasso_model = joblib.load('model/saved_model.pkl')
        global param
        param = pd.DataFrame({
            "birth": request.json.get('birth'),
            "gender": request.json.get('gender'),
            "job": request.json.get('job'),
            "position": request.json.get('position'),
            "mbti": request.json.get('mbti'),
            "importance": request.json.get('importance'),
            "proficiency": request.json.get('proficiency'),
            "type": request.json.get('type'),
            "start_time": request.json.get('start_time'),
            "end_time": request.json.get('end_time'),
            "time_status": request.json.get('time_status')
        }, index = [0])

        print(param)
        
        dataProcessing()

        pred = lasso_model.predict(param)
        print(pred)

        data = {'pred' : pred[0]}
        return data


def dataProcessing():
    # 성별 전처리
    param.loc[param["gender"].isnull(), "gender"] = -1
    param.loc[param["gender"] == "MALE", "gender"] = 0
    param.loc[param["gender"] == "FEMALE", "gender"] = 1

    # 직업 전처리
    param.loc[param["job"].isnull(), "job"] = -1
    param.loc[param["job"] == "경영/사무", "job"] = 0
    param.loc[param["job"] == "마케팅/무역/유통", "job"] = 1
    param.loc[param["job"] == "영업/고객상담", "job"] = 2
    param.loc[param["job"] == "IT/인터넷", "job"] = 3
    param.loc[param["job"] == "연구개발/설계", "job"] = 4
    param.loc[param["job"] == "생산/제조", "job"] = 5
    param.loc[param["job"] == "전문/특수직", "job"] = 6
    param.loc[param["job"] == "디자인", "job"] = 7
    param.loc[param["job"] == "미디어", "job"] = 8
    param.loc[param["job"] == "서비스", "job"] = 9
    param.loc[param["job"] == "건설", "job"] = 10

    # Position 전처리
    param.loc[param["position"].isnull(), "position"] = -1

    # MBTI 전처리
    param.loc[param["mbti"].isnull(), "mbti"] = -1
    param.loc[param["mbti"] == "ISTJ", "mbti"] = 0
    param.loc[param["mbti"] == "ISFJ", "mbti"] = 1
    param.loc[param["mbti"] == "INFJ", "mbti"] = 2
    param.loc[param["mbti"] == "INTJ", "mbti"] = 3
    param.loc[param["mbti"] == "ISTP", "mbti"] = 4
    param.loc[param["mbti"] == "ISFP", "mbti"] = 5
    param.loc[param["mbti"] == "INFP", "mbti"] = 6
    param.loc[param["mbti"] == "INTP", "mbti"] = 7
    param.loc[param["mbti"] == "ESTP", "mbti"] = 8
    param.loc[param["mbti"] == "ESFP", "mbti"] = 9
    param.loc[param["mbti"] == "ENFP", "mbti"] = 10
    param.loc[param["mbti"] == "ENTP", "mbti"] = 11
    param.loc[param["mbti"] == "ESTJ", "mbti"] = 12
    param.loc[param["mbti"] == "ESFJ", "mbti"] = 13
    param.loc[param["mbti"] == "ENFJ", "mbti"] = 14
    param.loc[param["mbti"] == "ENTJ", "mbti"] = 15

    # Status 전처리
    param.loc[param["time_status"].isnull(), "time_status"] = -1
    param.loc[param["time_status"] == "SHORT", "time_status"] = 0
    param.loc[param["time_status"] == "BASIC", "time_status"] = 1
    param.loc[param["time_status"] == "LONG", "time_status"] = 2

    #생년월일 전처리
    param.birth = pd.to_datetime(param.birth)
    param.birth = param.birth.map(dt.datetime.toordinal)
    param.start_time = pd.to_datetime(param.start_time)
    param.start_time = param.start_time.map(dt.datetime.toordinal)
    param.end_time = pd.to_datetime(param.end_time)
    param.end_time = param.end_time.map(dt.datetime.toordinal)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8185)