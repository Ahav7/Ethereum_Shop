import { invert } from 'lodash';
import paybislogo from './assets/paybis_logo.png';

type ResultRowProps = {
    loading?: boolean;
    providerName?:string;
    eth?:string;
};

type logo={
    source:string , 
    invert ?: boolean
};

const logos :{[keys:string]:logo} ={
    paybis : {source: paybislogo },
    guardarian : {source: 'https://guardarian.com/_next/static/media/main-logo.92fcf6b6.svg'},
    moonpay:{source : 'https://www.moonpay.com/assets/logo-full-white.svg'},  
    transak :{source: 'https://assets.transak.com/images/website/transak-logo.svg'}
};

export default function ResultRow({loading,providerName,eth}:ResultRowProps){
    return(
        <a 
        href = {`https://${providerName}.com`}
        target='_blank'
        className="block relative border min-h-[64px] 
        border-white/10 
        rounded-lg 
        bg-gradient-to-r 
        from-purple-500/10 
        to-blue-500/10 
        p-4 
        my-2 
        overflow-hidden">
            <div className="flex gap-4">
                
                {
                    providerName &&(
                        <div className='grow items-center flex'>
                            <img src={logos[providerName].source} className={
                                "h-8 " + (logos[providerName]?.invert ? invert : '')
                                } 
                                alt=""/>
                        </div>
                    )
                }
                
                
                {eth && (
                    <div className="flex gap-2">
                        <span className="text-xl text-purple-200/80">
                            {new Intl.NumberFormat('sv-US',{minimumFractionDigits:8}).format(parseFloat(eth))}
                        </span>
                        <span className="text-xl text-purple-300/50">ETH</span>
                    </div>

                )}
                
            </div>
            {
                loading  && (
                    <div className="bg-gradient-to-r from-transparent via-blue-900/50 skeleton-animation border-t border-white/25 to-transparent  inset-0 absolute"></div> 
                )
            }
        </a>

    );
} 