
		/*
		Verify every frame v should be 1,
		to and from keys should exist in frame
		frame type should be one of them auth, req, info or ack
		*/

	exports.parse=function(e) {

		var message=JSON.parse(e);

		if (message.v !== 1)
                        throw new Error ('illegal protocol v is not equal to 1');

                if (!message.to || !message.from)
                        throw new Error ('illegal protocol (from/to) address');

                if ((message.type !== 'auth') &&
                        (message.type !== 'req') &&
                        (message.type !== 'info') &&
                        (message.type !== 'ack'))
                        throw new Error ('illegal protocol message type');

                return message;
        };
		/*
		Verify ack frame
		*/

	exports.handle_auth_response=function(message) {
		if (message.from !== 'controller.auth')
                        return 'expected ack for auth: unexpected PDU "from" = ' + message.from;
                if (message.type !== 'ack')
                        return 'expected ack for auth: unexpected PDU "type" = ' + message.type;
		if(message.msg.status !== 'ok')
			return 'ack frame status is not-ok';
        	if(!message.msg.data.vc_id)
			return 'ack frame error- vc_id is not there';
		if(!message.msg.data.nickname)
			return 'ack frame error- nickname is not there';
		return null;
	};
		/*
		verify info frames should be addressed to me
		*/
	exports.addressed_to_me=function(to,vc_id) {
                var _to = to.split('.')[0].split(':');

                if ((_to[0] === 'user') && (_to[1] == vc_id))
                        return true;

                return false;
        };

	exports.handle_info_frame=function(message) {
		if(message.v !== 1)
			return 'protocol v is not equal to 1';
		if(message.type !== 'info')
			return 'frame type is not info';
		return null;
	};
