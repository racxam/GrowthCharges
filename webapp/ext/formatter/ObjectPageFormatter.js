jQuery.sap.declare("com.gc.dashboard.ext.formatter.ObjectPageFormatter");
com.gc.dashboard.ext.formatter.ObjectPageFormatter = {
    getCBCObjectKey: function(requestID, vsn, DraftGuid){
        var sObjectKey = "";
        if(requestID){
            sObjectKey = `${requestID}${vsn}CBC`;
        }else{
            sObjectKey = DraftGuid;
        }            
        return sObjectKey;
    },
    getDCObjectKey: function(requestID, vsn, DraftGuid){
        var sObjectKey = "";
        if(requestID){
            sObjectKey = `${requestID}${vsn}DC`;
        }else{
            sObjectKey = DraftGuid;
        }            
        return sObjectKey;
    },
    getCILObjectKey: function(requestID, vsn, DraftGuid){
        var sObjectKey = "";
        if(requestID){
            sObjectKey = `${requestID}${vsn}CIL`;
        }else{
            sObjectKey = DraftGuid;
        }            
        return sObjectKey;
    },
    getPayObjectKey: function(requestID, vsn, DraftGuid){
        var sObjectKey = "";
        if(requestID){
            sObjectKey = `${requestID}${vsn}PAY`;
        }else{
            sObjectKey = DraftGuid;
        }            
        return sObjectKey;
    },
    // eslint-disable-next-line camelcase
    getAttachmentsEditable: function(editable, fc){
        // eslint-disable-next-line camelcase
        if(editable && fc === 3){
            return "C";
        }else{
            return "D";
        }
    }
    
	};