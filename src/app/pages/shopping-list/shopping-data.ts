export class ShoppingData {

    formatData(data:any):void{
        let color: string = '', textColor:string = '';
        let auxObject:any;
        let dataFormat:any = [];

        data.map((x:any)=>{
            switch (x.typePurchase) {
                case 'Restaurante':
                  color = 'bg-blue-100';
                  textColor = 'text-blue-500';
                  break;
                  case 'Super':
                  color = 'bg-cyan-100';
                  textColor = 'text-cyan-500';
                  break;
                  case 'Retiro':
                  color = 'bg-purple-100';
                  textColor = 'text-purple-500';
                  break;
                  case 'Farmacia':
                  color = 'bg-orange-100';
                  textColor = 'text-orange-500';
                  break;
            }
            auxObject=Object.assign(x,{color},{textColor});
            dataFormat.push(auxObject);
        });
        return dataFormat;
    }

}